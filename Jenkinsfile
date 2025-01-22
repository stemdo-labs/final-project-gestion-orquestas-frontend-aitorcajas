node {
    environment {
        SONAR_TOKEN = credentials('SONAR_USER_TOKEN')  // Define the SONAR_TOKEN from Jenkins credentials
        SONAR_HOST_URL = credentials('SONAR_HOST_URL') // Replace with your actual SonarQube URL
    }

    stage('SCM') {
        checkout scm
    }

    stage('Extract Version') {
        def json = readJSON file: 'package.json'
        def version = json.version
        env.VERSION = version
        echo "Versión (frontend): ${env.VERSION}"
    }

    stage('SonarQube Analysis') {
        def scannerHome = tool 'sonar-scanner';
        withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectVersion=${env.VERSION} -Dsonar.qualitygate.wait=true"
        }
    }

    stage('Generar Reporte') {
        script {
            sh """
            curl -u ${SONAR_TOKEN}: "${SONAR_HOST_URL}/api/project_analyses/search?project=frontend-acajas-jenkins" > report.json
            cat report.json | jq . > analyses.json
            jq '.analyses[] | select(.projectVersion == "${env.VERSION}")' analyses.json > sonar-report.json
            """
        }
    }

    stage('Upload SonarQube Report Artifact') {
        archiveArtifacts allowEmptyArchive: true, artifacts: 'sonar-report.json', onlyIfSuccessful: true
    }

    stage('Evaluate SonarQube Result') {
        def result = sh(script: "cat sonar-report.json", returnStdout: true).trim()
        if (result.contains("success")) {
            echo "SonarQube step succeeded"
        } else {
            error "SonarQube step failed with outcome: ${result}"
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
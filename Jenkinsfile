node {
    stage('SCM') {
        checkout scm
    }

    stage('Extraer versión') {
        script {
            sh '''
                VERSION=$(jq -r '.version' package.json)
                if grep -q "^sonar.projectVersion=" sonar-project.properties; then
                    sed -i "s/^sonar.projectVersion=.*/sonar.projectVersion=$VERSION/" sonar-project.properties
                else
                    echo "sonar.projectVersion=$VERSION" >> sonar-project.properties
                fi
            '''
            }
    }

    stage('SonarQube Analysis') {
        def scannerHome = tool 'sonar-scanner';
        withSonarQubeEnv() {
        sh "${scannerHome}/bin/sonar-scanner"
        }
    }
}
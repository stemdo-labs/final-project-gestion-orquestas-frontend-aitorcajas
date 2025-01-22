pipeline {
    agent {
        kubernetes {
            label 'acajas'
            defaultContainer 'acajas'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: acajas
    image: jooeel98/agente-jenkins:0.3.1
    command:
    - cat
    tty: true
    securityContext:
      privileged: true
"""
        }
    }

    environment {
        SONAR_TOKEN = credentials('SONAR_USER_TOKEN')
        SONAR_HOST_URL = credentials('SONAR_HOST_URL')
    }
    stages {
        stage('Instalar dependencias') {
            steps {
                script {
                    sh '''
                        apk update
                        apk add --no-cache jq
                    '''
                }
            }
        }

        stage('SCM') {
            steps {
                checkout scm
            }
        }

        stage('Extract Version') {
            steps {
                script {
                    def json = readJSON file: 'package.json'
                    def version = json.version
                    env.VERSION = version
                    echo "Versión (frontend): ${env.VERSION}"
                }
            }
        }

        stage('Extract projectKey') {
            steps {
                script {
                    def key = sh(script: "grep -oP '^sonar.projectKey=\\K.*' sonar-project.properties", returnStdout: true).trim()
                    env.PROJECT_KEY = key
                    echo "Project Key: ${env.PROJECT_KEY}"
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'

                    try {
                        withSonarQubeEnv() {
                            sh """
                            ${scannerHome}/bin/sonar-scanner \
                                -Dsonar.projectVersion=${env.VERSION} \
                                -Dsonar.qualitygate.wait=true \
                                -Dsonar.projectKey=${env.PROJECT_KEY}
                            """
                        }
                    } catch (Exception e) {
                        def sonarOutcome = 'failure'
                        env.OUTCOME = sonarOutcome
                    }
                }
            }
        }

        stage('Generar Reporte') {
            steps {
                script {
                    sh """
                        curl -u ${SONAR_TOKEN}: "${SONAR_HOST_URL}/api/project_analyses/search?project=${env.PROJECT_KEY}" > report.json
                        cat report.json | jq . > analyses.json
                        jq '.analyses[] | select(.projectVersion == "${env.VERSION}")' analyses.json > sonar-report.json
                    """
                }
            }
        }

        stage('Upload SonarQube Report Artifact') {
            steps {
                script {
                    archiveArtifacts allowEmptyArchive: true, artifacts: 'sonar-report.json', onlyIfSuccessful: true
                }
            }
        }

        stage('Evaluate SonarQube Result') {
            steps {
                script {
                    if ("${env.OUTCOME}" == 'failure') {
                        error("Stopping pipeline due to SonarQube analysis failure.")
                    } 
                }
            }
        }
    }
}
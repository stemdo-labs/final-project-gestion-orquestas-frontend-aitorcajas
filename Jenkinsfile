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

    stages{
        stage('SCM') {
            steps{
                checkout scm
            }
        }

        stage('Extraer versión') {
            steps {
                script {
                    // Usar la función de la librería
                    def version = extractVersionFromJson('package.json')
                    echo "Versión extraída: ${version}"
                    if (fileExists('sonar-project.properties')) {
                        def properties = readProperties file: 'sonar-project.properties'
                        properties['sonar.projectVersion'] = version
                        writeProperties file: 'sonar-project.properties', properties: properties
                    } else {
                        writeFile file: 'sonar-project.properties', text: "sonar.projectVersion=${version}"
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps{
                script{
                    def scannerHome = tool 'sonar-scanner';
                    withSonarQubeEnv() {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
    }
}
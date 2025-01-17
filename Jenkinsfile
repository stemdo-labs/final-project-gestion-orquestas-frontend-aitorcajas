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
            steps{
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
        }

        stage('SonarQube Analysis') {
            steps{
                def scannerHome = tool 'sonar-scanner';
                withSonarQubeEnv() {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
    }
}
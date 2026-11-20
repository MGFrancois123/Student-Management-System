
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Starting DevOps application build...'

                bat 'docker --version'

                bat 'docker build -t devops-app:1.0 .'

                echo 'Docker image build completed!'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Starting DevOps application deployment...'

                bat 'docker rm -f devops-app 2>NUL'

                bat 'docker run -d --restart unless-stopped --name devops-app -p 8085:80 devops-app:1.0'

                echo 'Docker container deployed successfully!'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Build and deployment completed successfully.'
        }

        failure {
            echo 'FAILURE: Check the Jenkins Console Output.'
        }

        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}

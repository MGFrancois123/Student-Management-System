
pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'

                bat 'npm.cmd ci'

                echo 'Dependencies installed successfully!'
            }
        }

        stage('Unit Testing') {
            steps {
                echo 'Running unit tests...'

                bat 'npm.cmd run test:unit'

                echo 'Unit tests completed successfully!'
            }
        }

        stage('Integration Testing') {
            steps {
                echo 'Running integration tests...'

                bat 'npm.cmd run test:integration'

                echo 'Integration tests completed successfully!'
            }
        }

        stage('SAST Security Scan') {
            steps {
                echo 'Scanning source code for security vulnerabilities...'

                bat '''
                    docker run --rm -v "%WORKSPACE%:/src" semgrep/semgrep semgrep scan --config p/security-audit --error /src
                '''

                echo 'SAST security scan completed successfully!'
            }
        }

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

        stage('Pipeline Summary') {
            steps {
                echo 'Unit tests, integration tests, SAST, build and deployment completed successfully!'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: All tests and security scans passed!'
        }

        failure {
            echo 'FAILURE: Tests or security scanning detected a problem!'
        }

        always {
            echo 'Jenkins pipeline execution completed.'
        }
    }
}

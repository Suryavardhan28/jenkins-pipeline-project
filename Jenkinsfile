pipeline {
    agent {
        label 'build-slave'
    }

    environment {
        NODE_VERSION = '14.x'
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Configure Git') {
            steps {
                bat 'git config --global --add safe.directory C:/ProgramData/Jenkins/.jenkins/workspace/jenkins-pipeline-project'
                echo "Git safe directory configured"
            }
        }

        stage('Debug Branch Info') {
            steps {
                echo "env.BRANCH_NAME: ${env.BRANCH_NAME ?: 'null'}"
                bat "git rev-parse --abbrev-ref HEAD"
                bat "git branch"
                bat "git branch -a"
            }
        }

        stage('Setup Node.js') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
                echo "Build completed successfully"
            }
            post {
                failure {
                    echo "Build failed, sending notification..."
                    // Add email/Slack notifications here if needed
                }
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
            post {
                failure {
                    echo "Tests failed! Aborting the pipeline."
                    error "Tests failed"
                }
            }
        }

        stage('Security Scan') {
            steps {
                bat 'npm audit --production'
            }
            post {
                failure {
                    echo "Security vulnerabilities found!"
                    unstable('Security vulnerabilities found')
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                expression { return env.GIT_BRANCH == 'origin/dev' || env.BRANCH_NAME == 'dev' }
            }
            steps {
                echo "Deploying to staging environment"
                bat "${DOCKER_COMPOSE} up -d --build staging"
                echo "Application deployed to Staging at http://localhost:3001"
            }
            post {
                success {
                    echo "Staging deployment successful"
                }
                failure {
                    echo "Staging deployment failed"
                    bat "${DOCKER_COMPOSE} stop staging"
                }
            }
        }

        stage('Approval for Production') {
            when {
                expression { return env.GIT_BRANCH == 'origin/main' || env.BRANCH_NAME == 'main' }
            }
            steps {
                timeout(time: 1, unit: 'DAYS') {
                    input message: 'Approve deployment to production?', submitter: 'admin'
                }
            }
        }

        stage('Deploy to Production') {
            when {
                expression { return env.GIT_BRANCH == 'origin/main' || env.BRANCH_NAME == 'main' }
            }
            steps {
                echo "Deploying to production environment"
                bat "${DOCKER_COMPOSE} up -d --build production"
                echo "Application deployed to Production at http://localhost:3002"
            }
            post {
                success {
                    echo "Production deployment successful"
                }
                failure {
                    echo "Production deployment failed"
                    bat "${DOCKER_COMPOSE} stop production"
                    echo "Rolled back production deployment"
                }
            }
        }
    }

    post {
        always {
            node(null) {
                cleanWs()
                echo "Workspace cleaned"
            }
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
            // Add alert/notification step if needed
        }
    }
}

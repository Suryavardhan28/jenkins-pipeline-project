pipeline {
    agent any
    
    environment {
        NODE_VERSION = '14.x'
        DOCKER_COMPOSE = 'docker-compose'
    }
    
    stages {
        stage('Debug Branch Info') {
            steps {
                echo "Current branch name from env.BRANCH_NAME: ${env.BRANCH_NAME ?: 'null'}"
                bat "git rev-parse --abbrev-ref HEAD"
                bat "git branch"
                bat "git branch -a"
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                // For Windows
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
                    // You can add email notification here
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
                    // Continue anyway but mark as unstable
                    unstable('Security vulnerabilities found')
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                expression { return env.GIT_BRANCH == 'origin/dev' || env.BRANCH_NAME == 'dev' }
            }
            steps {
                echo "Preparing to deploy to staging environment"
                
                // Stop any existing containers first
                bat "docker stop staging-server || echo 'Container not running'"
                bat "docker rm staging-server || echo 'Container does not exist'"
                
                // Make sure Docker is running
                bat "docker info || echo 'Docker not running, please start Docker'"
                
                // Deploy using docker-compose
                bat "${DOCKER_COMPOSE} up -d --build staging"
                
                // Wait for container to be ready
                bat "timeout /t 10 /nobreak"
                
                // Check if container is running
                bat "docker ps | findstr staging-server"
                
                echo "Application deployed to Staging at http://localhost:3001"
            }
            post {
                success {
                    echo "Staging deployment successful"
                }
                failure {
                    echo "Staging deployment failed"
                    // You can add rollback steps here
                    bat "docker logs staging-server"
                    bat "${DOCKER_COMPOSE} stop staging"
                }
            }
        }
        
        stage('Approval for Production') {
            when {
                expression { return env.GIT_BRANCH == 'origin/main' || env.BRANCH_NAME == 'main' }
            }
            steps {
                // Manual approval step for production deployment
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
                echo "Preparing to deploy to production environment"
                
                // Stop any existing containers first
                bat "docker stop production-server || echo 'Container not running'"
                bat "docker rm production-server || echo 'Container does not exist'"
                
                // Make sure Docker is running
                bat "docker info || echo 'Docker not running, please start Docker'"
                
                // Deploy using docker-compose
                bat "${DOCKER_COMPOSE} up -d --build production"
                
                // Wait for container to be ready
                bat "timeout /t 10 /nobreak"
                
                // Check if container is running
                bat "docker ps | findstr production-server"
                
                echo "Application deployed to Production at http://localhost:3002"
            }
            post {
                success {
                    echo "Production deployment successful"
                }
                failure {
                    echo "Production deployment failed"
                    // Rollback steps
                    bat "docker logs production-server"
                    bat "${DOCKER_COMPOSE} stop production"
                    echo "Rolled back production deployment"
                }
            }
        }
    }
    
    post {
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true)
            echo "Workspace cleaned"
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
            // Add notification steps here (e.g., Slack, email)
        }
    }
} 
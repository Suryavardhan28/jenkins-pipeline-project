# Jenkins Pipeline Project

This project demonstrates a complete CI/CD pipeline implementation using Jenkins.

## Project Structure

- `index.js`: Main application file
- `test.js`: Test file for the application
- `Jenkinsfile`: Jenkins pipeline configuration
- `package.json`: Node.js project configuration

## Jenkins Setup Instructions

1. Install Jenkins
   - Download Jenkins from https://jenkins.io/
   - Run the Windows installer (jenkins.msi)
   - Follow the installation wizard
   - Install recommended plugins
   - Create admin user when prompted
   - Note down the initial admin password

2. Configure Jenkins Master-Slave
   - Master Node Setup:
     - Access Jenkins at http://localhost:8080
     - Go to Manage Jenkins > Manage Nodes
     - Configure master node settings
   - Slave Node Setup:
     - Create new node
     - Configure connection details
     - Set up SSH keys if needed
     - Test connection

3. Configure Jenkins Security
   - Go to Manage Jenkins > Configure Global Security
   - Enable Role-Based Access Control
   - Create roles:
     - Admin Role: Full access
     - Developer Role: Build and deploy access
     - Viewer Role: Read-only access
   - Assign roles to users

4. Pipeline Configuration
   - Create new pipeline job
   - Configure Git repository
   - Select "Pipeline script from SCM"
   - Set branch specifier to */main

## Pipeline Stages

1. Checkout: Retrieves code from Git repository
2. Setup Node.js: Installs required Node.js version
3. Build: Installs dependencies and builds application
4. Test: Runs application tests
5. Security Scan: Performs security audit
6. Deploy to Staging: Deploys to staging environment (develop branch)
7. Deploy to Production: Deploys to production environment (main branch)

## Branch Strategy

- `main`: Production branch
- `develop`: Staging branch
- Feature branches: Created from develop branch

## Pull Request Workflow

1. Create feature branch from develop
2. Make changes and commit
3. Push to remote repository
4. Create pull request to develop branch
5. Code review and approval
6. Merge to develop
7. Deploy to staging
8. Create pull request from develop to main
9. Deploy to production

## CI/CD Benefits

1. **Automated Testing**
   - Consistent test execution
   - Early bug detection
   - Reduced manual testing effort

2. **Faster Delivery**
   - Automated builds
   - Quick feedback loop
   - Reduced deployment time

3. **Quality Assurance**
   - Automated code quality checks
   - Security scanning
   - Performance testing

4. **Risk Reduction**
   - Automated rollback capabilities
   - Staged deployments
   - Environment consistency

5. **Team Collaboration**
   - Shared codebase
   - Automated code review process
   - Clear deployment status

6. **Cost Efficiency**
   - Reduced manual effort
   - Fewer production issues
   - Better resource utilization

7. **Scalability**
   - Easy to add new environments
   - Automated scaling
   - Consistent deployment process

8. **Monitoring and Feedback**
   - Build status tracking
   - Deployment notifications
   - Performance metrics

## Error Handling

The pipeline includes comprehensive error handling:
- Email notifications on failure
- Workspace cleanup
- Build status reporting
- Automated rollback procedures
- Security scanning
- Test failure reporting

## Environment Setup

1. **Staging Environment**
   - Mirror of production
   - Used for testing
   - Automated deployment from develop branch

2. **Production Environment**
   - Live environment
   - High availability
   - Automated deployment from main branch 
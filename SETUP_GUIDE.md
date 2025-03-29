# Jenkins Master-Slave Setup Guide

## Prerequisites

- Jenkins installed and running on http://localhost:8080
- Java installed on both master and slave machines
- Git installed
- Docker and Docker Compose installed (for environments)

## Jenkins Master Setup

1. **Access Jenkins at http://localhost:8080**

2. **Install Recommended Plugins**
   - Git plugin
   - Pipeline plugin
   - Docker plugin
   - Email Extension plugin

3. **Create Admin User**
   - Username: admin
   - Password: [secure password]
   - Full Name: Jenkins Admin
   - Email: [your email]

4. **Configure Jenkins Security**
   - Go to Manage Jenkins > Configure Global Security
   - Select "Jenkins' own user database" for Security Realm
   - Select "Matrix-based security" for Authorization
   - Give admin user full access
   - Click "Save"

## Jenkins Slave Setup

1. **Create Slave Node Directory**
   ```
   mkdir C:\jenkins-slave
   ```

2. **Configure Slave Node in Jenkins**
   - Go to Manage Jenkins > Manage Nodes and Clouds
   - Click "New Node"
   - Enter "Slave1" as the node name
   - Select "Permanent Agent" and click "OK"
   - Configure with these settings:
     * Description: "Build slave node"
     * Number of executors: 2
     * Remote root directory: C:\jenkins-slave
     * Labels: build-slave
     * Usage: "Use this node as much as possible"
     * Launch method: "Launch agent via Java Web Start"
   - Click "Save"

3. **Connect Slave Node**
   - Click on the newly created slave node
   - Follow the instructions to launch the agent
   - Download the agent.jar file
   - Run the provided Java command on the slave machine

## Git Repository Setup

1. **Create a Remote Repository**
   - Go to GitHub/GitLab
   - Create a new repository named "jenkins-pipeline-project"
   - Copy the repository URL

2. **Push Local Code to Remote Repository**
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [REPOSITORY_URL]
   git push -u origin main
   ```

3. **Create Develop Branch**
   ```
   git checkout -b develop
   git push -u origin develop
   ```

## Jenkins Pipeline Setup

1. **Create a New Pipeline Job**
   - Go to Jenkins dashboard
   - Click "New Item"
   - Enter "jenkins-pipeline-project" as the job name
   - Select "Pipeline" as the job type
   - Click "OK"

2. **Configure Pipeline**
   - Under "General", check "GitHub project" and add your repository URL
   - Under "Pipeline", select "Pipeline script from SCM"
   - Select "Git" as SCM
   - Enter your repository URL
   - Specify branches to build: "*/main", "*/develop"
   - Script Path: "Jenkinsfile"
   - Click "Save"

## Environment Setup

1. **Start Docker Containers**
   ```
   docker-compose up -d
   ```

2. **Verify Environments**
   - Staging: http://localhost:3001
   - Production: http://localhost:3002

## Testing the Pipeline

1. **Make a Change in Develop Branch**
   ```
   git checkout develop
   # Make changes to the code
   git add .
   git commit -m "Update feature"
   git push origin develop
   ```

2. **Create a Pull Request**
   - Go to GitHub/GitLab
   - Create a pull request from develop to main
   - Review the changes
   - Approve and merge

3. **Monitor Pipeline Execution**
   - Go to Jenkins dashboard
   - Check build status
   - Verify deployments

## Troubleshooting

1. **Jenkins Connection Issues**
   - Check Jenkins service is running
   - Verify firewall settings

2. **Slave Connection Issues**
   - Ensure Java is installed on the slave
   - Check network connectivity
   - Verify slave node configuration

3. **Pipeline Failures**
   - Check console output for errors
   - Verify environment variables
   - Check Docker service is running

## Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Docker Documentation](https://docs.docker.com/) 
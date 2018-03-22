pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm install --save-dev cross-env'
                sh 'npm test'
            }
        }
        stage('Deliver') {
              steps {
                sh 'npm run build'
                sh 'npm start &'
                sh 'sleep 1'
                echo '$! > .pidfile'
                input message: 'Finished using the web site ? (Click "Proceed" to continue)'
                sh 'kill $(cat .pidfile)'
            }
        }
    }
}
pipeline {
    agent {
        node {
            label 'master'
        }
    }
    stages {
        // stage("Get Repo::inline only") {
        //     steps {
        //         checkout([
        //         $class: 'GitSCM', 
        //         branches: [[name: '*/develop']], 
        //         userRemoteConfigs: [[url: 'https://github.com/UnosquareBelfast/admin-native']]])
        //     }
        // }
        stage("Node npm:install") {
            agent {
                node {
                    label 'mini-mac'
                }
            }
            steps {
                nvm('lts/carbon'){
                    sh "node -v"
                    sh "npm -v"
                    sh "npm install"
                }
            }
        }
        stage("Test env") {
            // agent { // Might not be best solution
            //     docker {
            //         image 'deredy/react-native:latest'
            //         args '-u root -v $PWD/:/app'
            //     }
            // }
            steps {
                sh "java -version"
                sh "javac -version"
                sh "pwd"
                sh "ls -la"
                sh "whoami"
                // sh "which adb"
            }
        }
    }

    post {
        always {
            step([$class: 'WsCleanup'])
        }
    }
}
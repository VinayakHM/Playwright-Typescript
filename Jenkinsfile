@Library('jenkins-pipeline-shared') _

pipeline {
  agent {
    docker {
      image 'cainc/node:18'
      args '--shm-size=512m'
    }
  }
  environment { 
    USER = credentials('scautomation')
  }
  triggers {
   cron('30 23 * * 0-4')
  }
  options {
    ansiColor colorMapName: 'XTerm'
  }
  stages {
    stage('Build conditions') {
      when {
        anyOf {
          allOf {
            branch 'main'
            triggeredBy 'TimerTrigger'
          }
          triggeredBy cause: "UserIdCause"
        }
      }
      stages {
        stage('Install') {
          steps {
            sh 'npm install'
            sh 'npx playwright install'
          }
        }
        stage('Playwright Success Central Automation Tests') {
          steps {
            catchError (message: 'Playwright tests failed', buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
              sh 'npm run test'
            }
          }
          post {
            always {
              publishHTML (target : [allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'test-results/report',
                            reportFiles: 'index.html',
                            reportName: 'report',
                            reportTitles: 'Success_Central_Playwright_Report'])
              archiveArtifacts artifacts: 'test-results/results/results.json, test-results/report/index.html'             
              script {
                summary = readJSON file: 'test-results/results/results.json'
                total = summary.stats.expected + summary.stats.unexpected + summary.stats.skipped + summary.stats.flaky
                pass = summary.stats.expected
                _fail = summary.stats.unexpected
                skip = summary.stats.skipped
                flaky = summary.stats.flaky
                health = (pass / total) * 100
                _color = ''
                if (health == 100) {
                  _color = '#03de37' // green
                }
                else if (health > 90) {
                  _color = '#ffff00' // yellow
                }
                else {
                  _color = '#FF0000' // red
                }
              }
              slackSend(
                color: _color,
                channel: '#success_central_automation',
                message: "\n *PLAYWRIGHT TEST SUMMARY* - Health: ${health}% \n Total: ${total} | Failures: ${_fail} | Skipped: ${skip} | Flaky: ${flaky} | Passed: ${pass} \n ${currentBuild.result}: Job '${currentBuild.fullProjectName} | [${currentBuild.number}]' \n ${currentBuild.absoluteUrl}report"
              )
            }
          }
        }
      }
      post {
        failure {
          slackSend(
            color: '#FF0000',
            channel: '#success_central_automation',
            message: "*Pipeline Failure* - Check logs  \n ${currentBuild.result}: Job '${currentBuild.fullProjectName} | [${currentBuild.number}]' \n ${currentBuild.absoluteUrl}"
          )
        }
      }
      }
    }
}
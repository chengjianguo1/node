module.exports = {
  apps : [{
    name: 'my',
    script: 'http.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'a b',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '39.106.14.146',
      ref  : 'origin/master',
      repo : 'https://github.com/wakeupmypig/pm2-test.git',
      path : '/home',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

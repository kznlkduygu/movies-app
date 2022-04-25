module.exports = {
  env: {
    apiKey: process.env.API_KEY,
  },
  //Yalnızca sunucuya yönelik herhangi bir çalışma zamanı yapılandırması için
  serverRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
  //Hem istemci hem de sunucu tarafı koduna erişilebilen her şey için
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
};

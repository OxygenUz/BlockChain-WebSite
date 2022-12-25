"use strict"
/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
const discoveryService = 
{
    name: "discovery",
    settings:{
        
    },
    eureka:{},
    dependencies:[],
    eureka:{},
    actions:{
        getInstanceById:{
            rest:{
                path:"/get-instance",
                method:"GET"
            },
            params:{
                appId:"string"
            },
            async handler(ctx)
            {
                let instances = this.eureka.getInstancesByAppId(ctx.params.appId);
                return instances[0].homePageUrl;
            }
        }
    },
    async created() {
        const Eureka = require('eureka-js-client').Eureka;
        const client = new Eureka({
            instance: {
              app: 'WALLET-SERVICE',
              hostName: 'localhost',
              ipAddr: '127.0.0.1',
              statusPageUrl: 'http://localhost:3000/info',
              vipAddress: 'WALLET-SERVICE',
              port: {
                '$': 3000,
                '@enabled': 'true',
              },
              dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
              },
              registerWithEureka: true,
              fetchRegistry: true,
            },
            eureka: {
              host: 'localhost',
              port: 8761,
              servicePath: '/eureka/apps/',
            },
          });
          console.log("Trying")
        client.start((error) => {
            console.log(error || 'Eureka client started');
        });
        this.eureka = client;
	},
}


module.exports =  discoveryService;
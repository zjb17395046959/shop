if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/page-sl/page-sl?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-swiper-dot/uni-swiper-dot?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/page-muban/page-muban?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/page-buJu/page-buJu?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/page-for-buju/page-for-buju?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/page-for-eassy/page-for-eassy?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/index/index?hash=bb82a0072012e3a845b2352485be866ca1973742');
require('../../pages/show/show?hash=4fc53841a0b3072add854a78e4d9d7107a577881');
require('../../pages/shop/shop?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/my?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/login/login?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/sheZhi/sheZhi?hash=8552c4458549b6b3f3cee08e1c20a01b3bdc1652');
require('../../pages/sheZhi/about/about?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/sheZhi/ipone-bind/ipone-bind?hash=a5bf8ed41baa5ce40d651a25982212b26b08e37c');
require('../../pages/sheZhi/password-set/password-set?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my_order/my_order?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/search/search?hash=964c7f7caf2d1481f6f818aa7df1a5e23ad62e6d');
require('../../pages/404page/404page?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/go_shop/go_shop?hash=f97d32bf9e346310acdeeb3ace57d3bd3a7484b4');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}
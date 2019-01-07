console.log(__filename);
console.log(__dirname);
console.log(Object.keys(global));
App({
    onLaunch: function() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);

        logs.forEach(item => {
            console.log(item);
        });
    },
    globalData: {
        userInfo: null
    }
});

require.config({
    paths: {
        jquery: './jquery.min',
        shopcar: './lib1/shopcar',
        cookie: './lib1/cookie'
    }
});

require(['shopcar'], function(shopcar) {
    shopcar.render();
})
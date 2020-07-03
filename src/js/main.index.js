require.config({
    paths: {
        jquery: './jquery.min',
        index: './lib1/index',
    }
});

require(['index'], function(index) {
    index.b.init();
    index.render();
    console.log(index);
    index.countDown();
});


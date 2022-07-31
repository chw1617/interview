
const createApp = ((...args) => {
    const app = ensureRenderer().createApp(...args);
    if ((process.env.NODE_ENV !== 'production')) {
        injectNativeTagCheck(app);
        injectCustomElementCheck(app);
    }
    const { mount } = app
    //重写amount
    app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (!container)
            return;
        const component = app._component;
        if (!isFunction(component) && !component.render && !component.template) {
            component.template = container.innerHTML;
        }
        // clear content before mounting
        container.innerHTML = '';
        const proxy = mount(container, false, container instanceof SVGElement);
        if (container instanceof Element) {
            container.removeAttribute('v-cloak');
            container.setAttribute('data-v-app', '');
        }
        return proxy;
    };
    //返回app
    return app;
});


const rendererOptions = extend({ patchProp, forcePatchProp }, nodeOps);
// lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.
let renderer;
let enabledHydration = false;
//缓存渲染器
function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
}


function createRenderer(options) {
    console.log('%c调用 baseCreateRenderer >>>','color:red')
    return baseCreateRenderer(options);
}


var count = 0
//创建渲染器
function baseCreateRenderer(options, createHydrationFns) {
    

    // 代码过长省略N行 ...
    
    return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate) //执行返回一个函数
    };
}
//
function createAppContext() {
    //每次放回一个新的对象
    return {
        app: null,
        config: {
            isNativeTag: NO,
            performance: false,
            globalProperties: {},
            optionMergeStrategies: {},
            isCustomElement: NO,
            errorHandler: undefined,
            warnHandler: undefined
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null)
    };
}

let uid = 0;
//创建app 的相关的api
function createAppAPI(render, hydrate) {
    return function createApp(rootComponent, rootProps = null) {
        if (rootProps != null && !isObject(rootProps)) {
            (process.env.NODE_ENV !== 'production') && warn(`root props passed to app.mount() must be an object.`);
            rootProps = null;
        }
        //新对象引用
        const context = createAppContext();
        const installedPlugins = new Set();
        let isMounted = false;
        const app = (context.app = {
            _uid: uid++,
            _component: rootComponent,
            _props: rootProps,
            _container: null,
            _context: context,
            version,
            get config() {
                return context.config;
            },
            set config(v) {
                if ((process.env.NODE_ENV !== 'production')) {
                    warn(`app.config cannot be replaced. Modify individual options instead.`);
                }
            },
            use(plugin, ...options) {
                if (installedPlugins.has(plugin)) {
                    (process.env.NODE_ENV !== 'production') && warn(`Plugin has already been applied to target app.`);
                }
                else if (plugin && isFunction(plugin.install)) {
                    installedPlugins.add(plugin);
                    plugin.install(app, ...options);
                }
                else if (isFunction(plugin)) {
                    installedPlugins.add(plugin);
                    plugin(app, ...options);
                }
                else if ((process.env.NODE_ENV !== 'production')) {
                    warn(`A plugin must either be a function or an object with an "install" ` +
                        `function.`);
                }
                return app;
            },
            mixin(mixin) {
                if (__VUE_OPTIONS_API__) {
                    if (!context.mixins.includes(mixin)) {
                        context.mixins.push(mixin);
                        // global mixin with props/emits de-optimizes props/emits
                        // normalization caching.
                        if (mixin.props || mixin.emits) {
                            context.deopt = true;
                        }
                    }
                    else if ((process.env.NODE_ENV !== 'production')) {
                        warn('Mixin has already been applied to target app' +
                            (mixin.name ? `: ${mixin.name}` : ''));
                    }
                }
                else if ((process.env.NODE_ENV !== 'production')) {
                    warn('Mixins are only available in builds supporting Options API');
                }
                return app;
            },
            component(name, component) {
                if ((process.env.NODE_ENV !== 'production')) {
                    validateComponentName(name, context.config);
                }
                if (!component) {
                    return context.components[name];
                }
                if ((process.env.NODE_ENV !== 'production') && context.components[name]) {
                    warn(`Component "${name}" has already been registered in target app.`);
                }
                context.components[name] = component;
                return app;
            },
            directive(name, directive) {
                if ((process.env.NODE_ENV !== 'production')) {
                    validateDirectiveName(name);
                }
                if (!directive) {
                    return context.directives[name];
                }
                if ((process.env.NODE_ENV !== 'production') && context.directives[name]) {
                    warn(`Directive "${name}" has already been registered in target app.`);
                }
                context.directives[name] = directive;
                return app;
            },
            mount(rootContainer, isHydrate, isSVG) {
                if (!isMounted) {
                    const vnode = createVNode(rootComponent, rootProps);
                    // store app context on the root VNode.
                    // this will be set on the root instance on initial mount.
                    vnode.appContext = context;
                    // HMR root reload
                    if ((process.env.NODE_ENV !== 'production')) {
                        context.reload = () => {
                            render(cloneVNode(vnode), rootContainer, isSVG);
                        };
                    }
                    if (isHydrate && hydrate) {
                        hydrate(vnode, rootContainer);
                    }
                    else {
                        render(vnode, rootContainer, isSVG);
                    }
                    isMounted = true;
                    app._container = rootContainer;
                    rootContainer.__vue_app__ = app;
                    if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
                        devtoolsInitApp(app, version);
                    }
                    return vnode.component.proxy;
                }
                else if ((process.env.NODE_ENV !== 'production')) {
                    warn(`App has already been mounted.\n` +
                        `If you want to remount the same app, move your app creation logic ` +
                        `into a factory function and create fresh app instances for each ` +
                        `mount - e.g. \`const createMyApp = () => createApp(App)\``);
                }
            },
            unmount() {
                if (isMounted) {
                    render(null, app._container);
                    if ((process.env.NODE_ENV !== 'production') || __VUE_PROD_DEVTOOLS__) {
                        devtoolsUnmountApp(app);
                    }
                    delete app._container.__vue_app__;
                }
                else if ((process.env.NODE_ENV !== 'production')) {
                    warn(`Cannot unmount an app that is not mounted.`);
                }
            },
            provide(key, value) {
                if ((process.env.NODE_ENV !== 'production') && key in context.provides) {
                    warn(`App already provides property with key "${String(key)}". ` +
                        `It will be overwritten with the new value.`);
                }
                // TypeScript doesn't allow symbols as index type
                // https://github.com/Microsoft/TypeScript/issues/24587
                context.provides[key] = value;
                return app;
            }
        });
        return app;
    };
}

//createApp() 做了哪些事情

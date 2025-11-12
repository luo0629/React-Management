export const menuConfig = [
    {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "HomeOutlined",
        url: "pages/home",

    },

    {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        icon: "ShopOutlined",
        url: "pages/mall",

    },
    {
        path: "/users",
        name: "users",
        label: "用户管理",
        icon: "UserOutlined",
        url: "pages/users",

    },

    {

        path: "/other",
        label: "其他",
        icon: "SettingOutlined",
        children: [
            {
                path: "other/page1",
                name: "page1",
                label: "页面1",
                icon: "SettingOutlined",
            },
            {
                path: "other/page2",
                name: "page2",
                label: "页面2",
                icon: "SettingOutlined",
            },
        ],
    },
];
    
import "@servicenow/sdk/global";

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                        "package_json": {
                            "table": "sys_module",
                            "id": "3876f21cefb2434785e74e36d7cd5928"
                        }
                    };
            }
        }
    }
}

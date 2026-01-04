import type {NextAdminOptions} from "@premieroctet/next-admin";

const options: NextAdminOptions = {
    basePath: "/admin",
    title: "COLIZEUM Admin",
    forceColorScheme: 'dark',
    model: {
        Zone: {
            toString: (zone: { name: string }) => zone.name,
            list: {
                display: ["id", "name", "slug", "price", "createdAt"],
                search: ["name", "slug"],
            },
            edit: {
                display: ["name", "slug", "description", "image", "price", "color"],
            },
        },
        ZoneSpec: {
            toString: (spec: { name: string }) => spec.name,
            list: {
                display: ["id", "name", "zone"],
            },
        },
        ZoneComponent: {
            toString: (comp: { model: string }) => comp.model,
            list: {
                display: ["id", "category", "name", "model", "zone"],
                search: ["name", "model"],
            },
            edit: {
                display: ["category", "name", "model", "specs", "zone"],
                fields: {
                    category: {
                        input: "select",
                        options: [
                            {value: "gpu", label: "Видеокарта"},
                            {value: "cpu", label: "Процессор"},
                            {value: "monitor", label: "Монитор"},
                        ],
                    },
                },
            },
        },
        ZoneDevice: {
            toString: (dev: { model: string }) => dev.model,
            list: {
                display: ["id", "category", "name", "model", "zone"],
                search: ["name", "model"],
            },
            edit: {
                display: ["category", "name", "model", "specs", "zone"],
                fields: {
                    category: {
                        input: "select",
                        options: [
                            {value: "keyboard", label: "Клавиатура"},
                            {value: "mouse", label: "Мышь"},
                            {value: "headset", label: "Наушники"},
                        ],
                    },
                },
            },
        },
        ZonePhoto: {
            toString: (photo: { alt: string }) => photo.alt,
            list: {
                display: ["id", "alt", "order", "zone"],
            },
            edit: {
                display: ["url", "alt", "order", "zone"],
            },
        },
    },
}

export default options;

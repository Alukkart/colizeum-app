import type {NextAdminOptions} from "@premieroctet/next-admin";
const sidebarGroupCN = "text-sm! border-b pb-1";

const options: NextAdminOptions = {
    title: "Colizeum Admin",
    externalLinks: [
        {
            url: '/',
            label: 'На главную'
        }
    ],
    sidebar: {
        groups: [
            {
                title: 'Зоны',
                models: ["Zone", "ZoneComponent", "ZoneDevice", "ZonePhoto"],
                className: sidebarGroupCN
            },
            {
                title: 'Турниры',
                models: ["Game", "Tournament", "TournamentPlayer", "Match"],
                className: sidebarGroupCN
            },
            {
                title: 'Игроки',
                models: ["Player", "PlayerAchievement", "PlayerSocialLink"],
                className: sidebarGroupCN
            },
            {
                title: 'Новости',
                models: ["News", "NewsTag"],
                className: sidebarGroupCN
            }
        ]
    }
}

export default options;

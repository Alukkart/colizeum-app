import {Player} from "@/prisma/generated/client";

export interface PlayerExtended extends Player {
    wins: number;
}
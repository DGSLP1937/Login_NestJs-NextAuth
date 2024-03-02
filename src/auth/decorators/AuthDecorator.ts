//AuthDecorator.ts

import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../../common/enum/Rol.enum";
import { AuthGuard } from "../guard/AuthGuard";
import { RolesGuard } from "../guard/RolesGuard";
import { Roles } from "./RolesDecorator";

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
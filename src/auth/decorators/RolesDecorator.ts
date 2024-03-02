//RolesDecorator.ts

import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enum/Rol.enum";

export const ROLES_KEYS = 'roles';

export const Roles = (role: Role) =>SetMetadata(ROLES_KEYS, role);
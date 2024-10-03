import { IPaginatedResponse } from "@/types/common.types";
import {
  BusinessInfoDto,
  InterestsDto,
  NotificationPreferencesDto,
  PersonalInfoDto,
  UpdateBusinessInfoDto,
  UpdateInterestsDto,
  UpdateNotificationPreferencesDto,
  UpdatePersonalInfoDto,
  UserDto,
} from "@/types/user.types";
import api from "./api";

const UserServices = {
  getAdmins: () => api.get<UserDto[]>("/users/admin"),

  getPersonalInfo: () => api.get<PersonalInfoDto>("/users/personal-info"),

  getBusinessInfo: () => api.get<BusinessInfoDto>("/users/business-info"),

  getInterests: () => api.get<InterestsDto[]>("/users/interests"),

  getNotificationPreferences: () =>
    api.get<NotificationPreferencesDto>("/users/notification-preferences"),

  getUsers: (pageOptions: Record<string, any>) =>
    api.get<IPaginatedResponse<Partial<UserDto>>>("/users", {
      params: pageOptions,
    }),

  getUser: (userId: string) => api.get<UserDto>(`/users/${userId}`),

  updatePersonalInfo: (data: UpdatePersonalInfoDto, avatar?: File) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    if (avatar) {
      formData.append("avatar", avatar);
    }
    return api.put<PersonalInfoDto>("/users/personal-info", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateBusinessInfo: (data: UpdateBusinessInfoDto) =>
    api.put<BusinessInfoDto>("/users/business-info", data),

  updateInterests: (data: UpdateInterestsDto) =>
    api.put<void>("/users/interests", data),

  updateNotificationPreferences: (data: UpdateNotificationPreferencesDto) =>
    api.put<NotificationPreferencesDto>(
      "/users/notification-preferences",
      data
    ),
};

export default UserServices;

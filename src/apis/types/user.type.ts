export type UpdateProfile = {
  nickname?: string;
  profilePic?: string;
  areaCodes?: number[];
};

export interface UpdateProfileProps {
  profileState: {
    nickname: string;
    areaCodes: number[];
    profileImg: string | null;
  };
  setProfileState: React.Dispatch<
    React.SetStateAction<{
      nickname: string;
      areaCodes: number[];
      profileImg: string | null;
    }>
  >;
}

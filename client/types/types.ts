export type user = {
  id: number;
  name: string;
  introduction?: string;
  hobby?: string;
  email: string;
  uid: string;
  image: userimage;
};

export type userimage = {
  id: number;
  name: string;
  url: string;
};

export type portfolioimage = {
  id: number;
  name: string;
  url: string;
};

export type skill = {
  id: number;
  name: string;
  description: string;
  userID: number;
  skilllevelID: number;
  skilllevel: {
    id: number;
    level: string;
    levelper: number;
    levelperleft: number;
  };
};

export type skilllevel = {
  id: number;
  level: string;
  levelper: number;
  levelperleft: number;
};

export type experience = {
  id: number;
  name: string;
  description: string;
  company: string;
  experiencecategoryID: number;
  startyearID: number;
  startmonthID: number;
  finishyearID: number;
  finishmonthID: number;
  experienceStartYear: {
    id: number;
    year: string;
  };
  experienceStartMonth: {
    id: number;
    month: string;
  };
  experienceFinishYear: {
    id: number;
    year: string;
  };
  experienceFinishMonth: {
    id: number;
    month: string;
  };
  userID: number;
};

export type experienceCategory = {
  id: number;
  name: string;
};

export type year = {
  id: number;
  year: string;
};

export type month = {
  id: number;
  month: string;
};

export type portfolio = {
  id: number;
  name: string;
  description: string;
  url: string;
  userID: number;
  image: {
    id: number;
    name: string;
    url: string;
    portfolioID: number;
  } | null; // 画像が存在しない場合
};

export type sns = {
  id: number;
  name: string;
  url: string;
  userID: number;
  typeofSNSID: number;
  typeofSNS: {
    id: number;
    typeofSNS: string;
  };
};

export type typeofsns = {
  id: number;
  typeofSNS: string;
};

export type Props = {
  userInfo: user;
};

export type SelectProps = {
  skillLevel?: skilllevel[];
  experienceCategory?: experienceCategory[];
  year?: year[];
  month?: month[];
  snsType?: typeofsns[];
};

export type UserProps = {
  userInfo?: user;
  userImage?: userimage;
};

export type SkillProps = {
  userSkill?: skill[];
  skillLevel?: skilllevel[];
};

export type ExperienceProps = {
  userExperience?: experience[];
  experienceCategory?: experienceCategory[];
  year?: year[];
  month?: month[];
};

export type PortfolioProps = {
  userPortfolio: portfolio[];
};

export type SnsProps = {
  userSns?: sns[];
  snsType?: typeofsns[];
};

export type SingInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

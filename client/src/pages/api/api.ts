import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

// ユーザー情報を取得する;
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    if (!params?.id) {
      console.error("ユーザー情報がありません");
      return {
        props: {
          userInfo: null,
          userImage: null,
          userSkill: null,
          skillLevel: null,
          userExperience: null,
          experienceCategory: null,
          year: null,
          month: null,
          userPortfolio: null,
          userSns: null,
          snsType: null,
        },
      };
    }

    const [
      userRes,
      userImageRes,
      skillRes,
      skilllevelRes,
      experienceRes,
      experienceCategoryRes,
      yearRes,
      monthRes,
      portfolioRes,
      snsRes,
      snstypeRes,
    ] = await Promise.all([
      axios.get(`${apiURL}/api/v1/user/${params.id}`),
      axios.get(`${apiURL}/api/v1/userimg/${params.id}`),
      axios.get(`${apiURL}/api/v1/skill/${params.id}`),
      axios.get(`${apiURL}/api/v1/skilllevel`),
      axios.get(`${apiURL}/api/v1/experience/${params.id}`),
      axios.get(`${apiURL}/api/v1/experiencecategory`),
      axios.get(`${apiURL}/api/v1/year`),
      axios.get(`${apiURL}/api/v1/month`),
      axios.get(`${apiURL}/api/v1/portfolio/${params.id}`),
      axios.get(`${apiURL}/api/v1/sns/${params.id}`),
      axios.get(`${apiURL}/api/v1/typeofsns`),
    ]);

    return {
      props: {
        userInfo: userRes.data,
        userImage: userImageRes.data,
        userSkill: skillRes.data,
        skillLevel: skilllevelRes.data,
        userExperience: experienceRes.data,
        experienceCategory: experienceCategoryRes.data,
        year: yearRes.data,
        month: monthRes.data,
        userPortfolio: portfolioRes.data,
        userSns: snsRes.data,
        snsType: snstypeRes.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        userInfo: null,
        userImage: null,
        userSkill: null,
        skillLevel: null,
        userExperience: null,
        experienceCategory: null,
        year: null,
        month: null,
        userPortfolio: null,
        userSns: null,
        snsType: null,
      },
    };
  }
};

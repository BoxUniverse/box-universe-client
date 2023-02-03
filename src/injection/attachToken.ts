export default function attachToken(gssp) {
  return async (context) => {
    const token = context.req.cookies.accessToken;

    const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        ...gsspData.props,
        cookies: {
          accessToken: token,
        },
      },
    };
  };
}

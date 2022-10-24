function LandingPage() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <div className="pt-52 flex justify-center min-h-screen gap-32">
      <div className="flex flex-col gap-7">
        <h1 className="text-2xl font-bold">Bundling Product Recomendations</h1>
        <p className="w-96 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet sint
          necessitatibus pariatur ab dicta modi voluptatem laboriosam numquam
          debitis dignissimos? Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Sed, dolor.
        </p>
        <div className="flex gap-5">
          <a
            href="/recomendations"
            className="px-3 py-3 font-semibold rounded-lg bg-black border-2 border-blue-500 text-white"
          >
            Get Recomendations
          </a>
          <a
            href="/history"
            className="px-3 py-3 font-semibold rounded-lg  border-2 border-blue-500 "
          >
            User History
          </a>
        </div>
      </div>
      <div>
        <img src={`${baseURL}/logo-landing.png`} alt="landing" />
      </div>
    </div>
  );
}

export default LandingPage;

export default function getApiKey() {
  // API key stored at AWS Systems Manager endpoint
  // console.log(await ssm.getParameter({ Name: "/openai/api_key" }));
  // const ssmParam = await ssm.getParameter({ Name: "/openai/api_key" });
  // return ssmParam.Parameter.Value;
  return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
}

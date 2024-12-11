import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com", async ({request}) => {
    const body = await request.json();
    const {when, lanes, people, shoes} = body;
    const sum = +lanes * 100 + +people *120;
    const confirmation = {
      id: "12345-SUCHCODES",
      price: sum.toString(),
      active: true,
      when,
      lanes,
      people,
      shoes,
    };

    sessionStorage.setItem("confirmation", JSON.stringify(confirmation));
    const sessionData = JSON.parse(sessionStorage.getItem("confirmation"));
    console.log("SESSIONDATA", sessionData);
    return HttpResponse.json(confirmation);

  })
];

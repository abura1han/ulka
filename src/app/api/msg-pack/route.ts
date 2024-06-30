import moment from "moment";
import { pack } from "msgpackr";

export interface CalendarData {
  id: string;
  startsAt: string[];
  endsAt: string[];
  logo: string;
  coverImage: string;
  title: string;
  description: string;
  attachments: any[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  _version: number;
  public: number;
}

const avatarUrl =
  "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const calendarData = [
  {
    id: "s_sssdxedff",
    startsAt: [moment().format("yy-MM-DD"), "08:10 PM"],
    endsAt: [moment().format("yy-MM-DD"), "10:00 PM"],
    logo: avatarUrl,
    coverImage: "",
    title: "Space Hub - Rewind solar system",
    description: "Some description",
    attachments: [],
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    _version: 1,
    public: 1,
  },
  {
    id: "s_sssdxed233v",
    startsAt: [moment().format("yy-MM-DD"), "10:00 PM"],
    endsAt: [moment().format("yy-MM-DD"), "10:30 PM"],
    logo: avatarUrl,
    coverImage: "",
    title: "Space Hub - Rewind solar system",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis reprehenderit consequatur, consectetur aut eligendi fugiat nisi doloremque quisquam ducimus ipsa sit excepturi nesciunt dolores. Amet nostrum nisi nam ullam aperiam.",
    attachments: [],
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    _version: 1,
    public: 1,
  },
  {
    id: "s_sssddf2ff",
    startsAt: [moment().format("yy-MM-DD"), "10:00 PM"],
    endsAt: [moment().format("yy-MM-DD"), "10:30 PM"],
    logo: avatarUrl,
    coverImage: "",
    title: "Space Hub - Rewind solar system",
    description: "Some description",
    attachments: [],
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    _version: 1,
    public: 1,
  },
  {
    id: "s_sssdxedffr",
    startsAt: [moment().format("yy-MM-DD"), "10:00 PM"],
    endsAt: [moment().format("yy-MM-DD"), "10:30 PM"],
    logo: avatarUrl,
    coverImage: "",
    title: "Space Hub - Rewind solar system",
    description: "Some description",
    attachments: [],
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    _version: 1,
    public: 1,
  },
  {
    id: "s_sssdxed233",
    startsAt: [moment().format("yy-MM-DD"), "10:00 PM"],
    endsAt: [moment().format("yy-MM-DD"), "10:00 PM"],
    logo: avatarUrl,
    coverImage: "",
    title: "Space Hub - Rewind solar system",
    description: "Some description",
    attachments: [],
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    _version: 1,
    public: 1,
  },
  {
    id: "s_sssddf2ffj",
    startsAt: [moment().format("yy-MM-DD"), "10:00 PM"],
    endsAt: [moment().format("yy-MM-DD"), "10:00 PM"],
    logo: avatarUrl,
    coverImage: "",
    title: "Space Hub - Rewind solar system",
    description: "Some description",
    attachments: [],
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    _version: 1,
    public: 1,
  },
] as CalendarData[];

export async function GET(req: Request) {
  const url = new URL(req.url);

  if (url.searchParams.get("asJson") === "true") {
    return Response.json(calendarData);
  }

  const serializedAsBuffer = pack(calendarData);

  return new Response(serializedAsBuffer, {
    headers: { "Content-Type": 'application/octet-stream' },
  });
}

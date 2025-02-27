import { Client } from "@upstash/workflow";
import config from "./config";

const client = new Client({ token: config.env.upstash.qstashToken })

export default client
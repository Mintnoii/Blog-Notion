import {query} from "../../lib/server";

export default async function handler( req, res ) {
  const data = await query()
  res.status(200).json(data);
}
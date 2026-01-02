import React, { useEffect, useState } from "react";
import { api } from "../api";
import Cards from "../components/Cards.jsx";
import DisagreeCard from "../components/DisagreeCard.jsx";
import ResponsesTable from "../components/ResponsesTable.jsx";

export default function Reports() {
  const [summary, setSummary] = useState({});
  const [ranked, setRanked] = useState([]);
  const [responses, setResponses] = useState([]);
  useEffect(() => { (async () => {
    const s = await api.reportSummary(); setSummary(s.data);
    const d = await api.disagreeInsights(); setRanked(d.data.ranked);
    const r = await api.reportResponses(); setResponses(r.data.responses);
  })(); }, []);
  return (<>
    <Cards data={summary} />
    <DisagreeCard ranked={ranked} />
    <ResponsesTable responses={responses} />
  </>);
}

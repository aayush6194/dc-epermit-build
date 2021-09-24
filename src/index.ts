//expressy imports
import express, { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as config from "../config";
import * as repo from "../repository";
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/epermit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const epermits = await repo.getPermit(
      id === "all" ? undefined : new ObjectId(id)
    );
    res.status(200).json({ success: true, epermits });
  } catch (e) {
    res.json({ success: false, message: e.message || e });
  }
});

app.post("/api/epermit", async (req, res, next) => {
  const { epermit } = req.body;
  try {
    const added = await repo.postEpermit(epermit);

    res.status(200).json({ success: true });
  } catch (e) {
    res.json({ success: false, message: e.message || e });
  }
});

app.post("/api/epermit/:id", async (req, res, next) => {
  const { id } = req.params;
  const { epermit } = req.body;
  try {
    const added = await repo.addPermit(epermit, new ObjectId(id));

    res.status(200).json({ success: true, epermit: added });
  } catch (e) {
    res.json({ success: false, message: e.message || e });
  }
});

app.delete("/api/epermit/all", async (req, res, next) => {
  try {
    await repo.removeEpermit();
    res.status(200).json({ success: true });
  } catch (e) {
    res.json({ success: false, message: e.message || e });
  }
});

app.delete("/api/epermit/reset", async (req, res, next) => {
  try {
    await repo.reset();
    res.status(200).json({ success: true });
  } catch (e) {
    res.json({ success: false, message: e.message || e });
  }
});

const helperGenerator = (path: string) => {
  return () => {
    const HELPER_URL = "https://test.findparkstash.com/api/v1/testOnly";
    app.post("/api/" + path, async (req, res, next) => {
      try {
        const url = HELPER_URL + "/" + path;
        const response = await axios.post(url, req.body);
        console.log(url)
        res.status(200).json(response.data);
      } catch (e) {
        res.json({ success: false, message: e.message || e });
      }
    });
  };
};

const emailApi = helperGenerator("email");
const smsApi = helperGenerator("sms");

emailApi();
smsApi();

app.listen(config.PORT, () => {
  console.log("listening to " + config.PORT);
});

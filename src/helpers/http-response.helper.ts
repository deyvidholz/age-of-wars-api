import { Response } from 'express';

export class HttpResponseHelper {
  static created(data: ResponseOK) {
    const payload: any = {
      message: data.message || null,
    };

    if (data.data !== undefined) {
      payload.data = data.data;
    }

    return data.res.status(201).json(payload);
  }

  static success(data: ResponseOK) {
    const payload: any = {
      message: data.message || null,
    };

    if (data.data !== undefined) {
      payload.data = data.data;
    }

    return data.res.status(200).json(payload);
  }

  static unauthorized(data: ResponseError) {
    return data.res.status(401).json({
      error: true,
      message: data.message || null,
      data: data.data || null,
    });
  }

  static invalidData(data: ResponseError) {
    return data.res.status(422).json({
      error: true,
      message: data.message || null,
      data: data.data || null,
    });
  }

  static notFound(data: ResponseError) {
    return data.res.status(404).json({
      error: true,
      message: data.message || null,
      data: data.data || null,
    });
  }

  static badRequest(data: ResponseError) {
    return data.res.status(400).json({
      error: true,
      message: data.message || null,
      data: data.data || null,
    });
  }

  static internalError(data: ResponseError) {
    return data.res.status(500).json({
      error: true,
      message: data.message || null,
      data: data.data || null,
    });
  }
}

export type ResponseOK = {
  res: Response;
  message?: string;
  data?: any;
};

export type ResponseError = {
  res: Response;
  message?: string;
  data?: any;
};

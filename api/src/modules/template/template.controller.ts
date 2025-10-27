import { Request, Response } from 'express';
import { HttpResponseHelper } from '../../helpers/http-response.helper';
import { TemplateHelper } from '../../helpers/template.helper';
import { TemplateService } from './template.service';

export class TemplateController {
  static async getBaseGameData(req: Request, res: Response) {
    const baseData = TemplateHelper.getBaseGameDataAsTemplate();

    return HttpResponseHelper.success({
      res,
      data: { templateData: baseData },
    });
  }
  static async create(req: Request, res: Response) {
    const serviceData = await TemplateService.create({
      playerId: req.user.id,
      name: req.body.name,
      description: req.body.description,
      data: req.body.data,
    });

    if (serviceData.error) {
      return HttpResponseHelper.badRequest({
        res,
        message: serviceData.message,
        data: serviceData.data,
      });
    }

    return HttpResponseHelper.success({
      res,
      message: serviceData.message,
      data: serviceData.data,
    });
  }

  static async findAll(req: Request, res: Response) {
    const serviceData = await TemplateService.findAll({
      playerId: req.user.id,
    });

    if (serviceData.error) {
      return HttpResponseHelper.badRequest({
        res,
        message: serviceData.message,
        data: serviceData.data,
      });
    }

    return HttpResponseHelper.success({
      res,
      data: serviceData.data,
    });
  }

  static async findOne(req: Request, res: Response) {
    const serviceData = await TemplateService.findOne({
      playerId: req.user.id,
      templateId: req.params.templateId,
    });

    if (serviceData.error) {
      return HttpResponseHelper.badRequest({
        res,
        message: serviceData.message,
        data: serviceData.data,
      });
    }

    return HttpResponseHelper.success({
      res,
      data: serviceData.data,
    });
  }

  static async update(req: Request, res: Response) {
    const serviceData = await TemplateService.update({
      playerId: req.user.id,
      templateId: req.params.templateId,
      name: req.body.name,
      description: req.body.description,
      data: req.body.data,
    });

    if (serviceData.error) {
      return HttpResponseHelper.badRequest({
        res,
        message: serviceData.message,
        data: serviceData.data,
      });
    }

    return HttpResponseHelper.success({
      res,
      message: serviceData.message,
      data: serviceData.data,
    });
  }

  static async delete(req: Request, res: Response) {
    const serviceData = await TemplateService.delete({
      playerId: req.user.id,
      templateId: req.params.templateId,
    });

    if (serviceData.error) {
      return HttpResponseHelper.badRequest({
        res,
        message: serviceData.message,
        data: serviceData.data,
      });
    }

    return HttpResponseHelper.success({
      res,
      message: serviceData.message,
      data: serviceData.data,
    });
  }
}

import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../helpers/response.helper';
import { playerRepository } from '../player/player.repository';
import { templateRepository } from './template.repository';
import { TemplateData } from './template.typing';

export class TemplateService {
  static async create(
    data: CreateTemplateParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const player = await playerRepository().findOne(data.playerId);

    if (!player) {
      return ResponseHelper.error({
        message: 'Player not found',
      });
    }

    if (!data.name || data.name.length < 3 || data.name.length > 50) {
      return ResponseHelper.error({
        message: 'Template name must be between 3 and 50 characters',
      });
    }

    if (!data.data || !data.data.countries) {
      return ResponseHelper.error({
        message: 'Template data is required',
      });
    }

    const template = templateRepository().create({
      name: data.name,
      description: data.description,
      owner: player,
      data: data.data,
    });

    await templateRepository().save(template);

    return ResponseHelper.success({
      message: 'Template created successfully',
      data: { template },
    });
  }

  static async findAll(
    data: FindAllTemplatesParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const templates = await templateRepository().find({
      where: { owner: { id: data.playerId } },
      order: { createdAt: 'DESC' },
    });

    return ResponseHelper.success({
      data: { templates },
    });
  }

  static async findOne(
    data: FindOneTemplateParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const template = await templateRepository().findOne({
      where: {
        id: data.templateId,
        owner: { id: data.playerId },
      },
    });

    if (!template) {
      return ResponseHelper.error({
        message: 'Template not found',
      });
    }

    return ResponseHelper.success({
      data: { template },
    });
  }

  static async update(
    data: UpdateTemplateParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const template = await templateRepository().findOne({
      where: {
        id: data.templateId,
        owner: { id: data.playerId },
      },
    });

    if (!template) {
      return ResponseHelper.error({
        message: 'Template not found',
      });
    }

    if (data.name !== undefined) {
      if (data.name.length < 3 || data.name.length > 50) {
        return ResponseHelper.error({
          message: 'Template name must be between 3 and 50 characters',
        });
      }
      template.name = data.name;
    }

    if (data.description !== undefined) {
      template.description = data.description;
    }

    if (data.data !== undefined) {
      if (!data.data.countries) {
        return ResponseHelper.error({
          message: 'Template data must contain countries',
        });
      }
      template.data = data.data;
    }

    await templateRepository().save(template);

    return ResponseHelper.success({
      message: 'Template updated successfully',
      data: { template },
    });
  }

  static async delete(
    data: DeleteTemplateParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const template = await templateRepository().findOne({
      where: {
        id: data.templateId,
        owner: { id: data.playerId },
      },
    });

    if (!template) {
      return ResponseHelper.error({
        message: 'Template not found',
      });
    }

    await templateRepository().remove(template);

    return ResponseHelper.success({
      message: 'Template deleted successfully',
    });
  }
}

type CreateTemplateParam = {
  playerId: string;
  name: string;
  description?: string;
  data: TemplateData;
};

type FindAllTemplatesParam = {
  playerId: string;
};

type FindOneTemplateParam = {
  playerId: string;
  templateId: string;
};

type UpdateTemplateParam = {
  playerId: string;
  templateId: string;
  name?: string;
  description?: string;
  data?: TemplateData;
};

type DeleteTemplateParam = {
  playerId: string;
  templateId: string;
};

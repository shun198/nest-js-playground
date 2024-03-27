import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dto/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        make: {
          type: 'string',
          default: 'toyota',
        },
        model: {
          type: 'string',
          default: 'corolla',
        },
        year: {
          type: 'int',
          default: '1980',
        },
        mileage: {
          type: 'int',
          default: 100000,
        },
        lng: {
          type: 'int',
          default: 0,
        },
        lat: {
          type: 'int',
          default: 0,
        },
        price: {
          type: 'int',
          default: 500000,
        },
      },
    },
  })
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        approved: {
          type: 'boolean',
          default: 'true',
        },
      },
    },
  })
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}

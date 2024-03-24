import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags, ApiBody } from '@nestjs/swagger';

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
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}

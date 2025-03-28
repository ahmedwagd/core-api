import {
  Controller
} from '@nestjs/common';
import { ClinicService } from '../services/clinic.service';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly _clinicService: ClinicService) {}
  // @Post()
  // async create(@Body() createClinicDto: CreateClinicDto) {
  //   return this._clinicService.create(createClinicDto);
  // }
  // // @UseGuards(JwtAuthGuard)
  // @Get()
  // async findAll() {
  //   return this._clinicService.getAll();
  // }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this._clinicService.findOne(id);
  // }
}

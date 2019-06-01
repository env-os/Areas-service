import { Post, JsonController, Body, Get, Res, Param, Delete } from 'routing-controllers';
import { Response } from 'express'
import { DevicesService } from '../services/devices.service'


@JsonController('/devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) {}
}
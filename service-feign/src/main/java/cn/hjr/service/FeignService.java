package cn.hjr.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value = "admin-server")
public interface FeignService {

    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public String hello();

}

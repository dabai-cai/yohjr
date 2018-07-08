package cn.hjr.controller;

import cn.hjr.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: 大白菜
 * Date: 2018/7/8
 * Time: 23:02
 * Version: 1.0v
 */
@RestController
public class HelloController {

    @Autowired
    HelloService helloService;
    @RequestMapping(value = "/hello")
    public String hello(){
        return helloService.hiService();
    }


}

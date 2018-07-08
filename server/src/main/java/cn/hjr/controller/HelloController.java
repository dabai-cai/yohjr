package cn.hjr.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: 大白菜
 * Date: 2018/7/8
 * Time: 20:52
 * Version: 1.0v
 */
@RestController
public class HelloController {


    @RequestMapping(value = "/hello",produces = "application/json;charset=utf-8",method = RequestMethod.GET)
    public String hello(){
        return "hello hjr";
    }


}

package cn.hjr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: 大白菜
 * Date: 2018/7/8
 * Time: 20:33
 * Version: 1.0v
 */

@EnableEurekaServer
@SpringBootApplication
public class EurekaApplication  extends SpringBootServletInitializer  {


    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        builder.sources(EurekaApplication.class);
        return super.configure(builder);
    }

    public static void main(String[] args) {
        SpringApplication.run(EurekaApplication.class,args);
    }
}

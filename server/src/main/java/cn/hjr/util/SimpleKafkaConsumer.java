package cn.hjr.util;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.util.Collections;
import java.util.Properties;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: 大白菜
 * Date: 2018/7/29
 * Time: 13:54
 * Version: 1.0v
 */
public class SimpleKafkaConsumer {
    public static void main(String[] args) {

        Properties props = new Properties();

        props.put("bootstrap.servers", "hadoop05:9092,hadoop06:9092,hadoop07:9092");
        //每个消费者分配独立的组号
        props.put("group.id", "hjr");

        //如果value合法，则自动提交偏移量
        props.put("enable.auto.commit", "true");

        //设置多久一次更新被消费消息的偏移量
        props.put("auto.commit.interval.ms", "1000");

        //设置会话响应的时间，超过这个时间kafka可以选择放弃消费或者消费下一条消息
        props.put("session.timeout.ms", "30000");

        props.put("key.deserializer",
                "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer",
                "org.apache.kafka.common.serialization.StringDeserializer");

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

        consumer.subscribe(Collections.singletonList("leslie"));


        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(200);
            for (ConsumerRecord<String, String> record : records){
                // print the offset,key and value for the consumer records.
                System.out.printf("offset = %d, key = %s, value = %s\n",
                        record.offset(), record.key(), record.value());
                System.out.println("消费:  "+record.headers()+record.key()+record.value());
            }

        }
    }
}

from locust import HttpUser, task

class HelloWorldUser(HttpUser):
    @task
    def hello_world(self):
        self.client.get("<<YOU_SERVER_IP>>/secondApproach/2")
    